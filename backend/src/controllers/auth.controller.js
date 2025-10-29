import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {

    const { fullName , email , password  } = req.body;

    try{
        if(!fullName || !email || !password){
            return  res.status(400).json({ message: 'All fields are required' });
        }
        if(password.length < 6){    
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: 'Invalid email format' });
        }   

        const existingUser = await User.findOne({ email }); // Replace with actual DB call to check user
        if(existingUser){
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: fullName,
            email,
            password: hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id , res); // Implement token generation logic
            await newUser.save(); // Save user to the database
            return res.status(201).json({ 
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
                message: 'User registered successfully' 
            });
        }



    }catch (error){
        console.error('Error during user signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}