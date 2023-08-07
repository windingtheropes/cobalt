import cobalt from './src'
import express from 'express'

const app = cobalt.app
app.use(express.json())
cobalt.listen()
