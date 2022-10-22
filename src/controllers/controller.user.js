import bycrypt from 'bcrypt'
import { User } from '../models/model.user.js'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from 'express'
import bcryptjs from 'bcryptjs'

dotenv.config()

const signedToken = _id => jsonwebtoken.sign({ _id }, process.env.SECRETO)

const findAndAssignUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            res.status(401).end()
        }
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}
const validateJwt = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken.verify(token, process.env.SECRETO, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    }
}

const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser)

const Controller = {
    login: async (req, res, next) => {
        try {
            const { body } = req
            const userByName = await User.findOne({ username: body.username })
            if (!userByName) {
                return res.status(500).send(e.message)
            } else {
                const match = bcryptjs.compareSync(body.password, userByName.password)
                if (match) {
                    const token = signedToken(userByName._id);
                    return res.status(200).send(token)
                } else {
                    return res.status(500).send('Error')
                }
            }
        } catch (e) {
            return res.status(500).send('Error')
        }
    }
}

export { Controller, isAuthenticated }