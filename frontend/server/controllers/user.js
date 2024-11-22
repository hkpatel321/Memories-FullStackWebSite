import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin=async(req,res)=>{
    const {email,password} =req.body;
    try {
        const existringUser=await User.findOne({email});
        if(!existringUser)return res.status(404).json({message:"User doesn't exist"});
        const isPasswordCorrect =await bcrypt.compare(password,existringUser.password);
        if(!isPasswordCorrect)return res.status(400).json({message:"Invalid Credent"});
        const token=jwt.sign({email:existringUser.email,id:existringUser._id},'test',{expiresIn:'1h'});
        res.status(200).json({result:existringUser,token});


    } catch (error) {
        res.status(500).json({message:"Something went wrong "});
    }
}
export const signup=async(req,res)=>{
      const {email,password,firstName ,confirmPassword,lastName}=req.body;
      try {
        const existingUser=await User.findOne({email});
        if(existingUser)return res.status(400).json({message:"User already exists"});
        if(password!==confirmPassword)return res.status(400).json({message:"Password don't match"});
        const hashedPassword=await bcrypt.hash(password,12);
        const result=await User.create({email,password:hashedPassword, name:`${firstName} ${lastName}`});
        const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1h"});
        res.status(200).json({result,token});
      } catch (error) {
        res.status(500).json({message:"Something went wrong "});
      }
      
}