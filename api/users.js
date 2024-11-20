const prisma = require("../prisma")
const express = require("express")
const router = express()
module.exports = router

router.get("/", async(req, res, next) => {
  try {
    const desiredUsers = await prisma.user.findMany()
    res.json(desiredUsers)
  } catch (err) {
    next(err)
  }
  res.json()
})

router.get("/:id", async(req, res, next) => {
  const { id } = req.params;
  try {
    const desiredUsers = await prisma.user.findUniqueOrThrow({
      where: {id :+id},
      include: {playlists: true}
    })
  } catch (err) {
    next(err)
  }
})

router.post("/:id/playlist", async(req, res, next) => {
  const {id} = req.params
  const {name, description} = req.body
  try {
    const desiredPlaylist = await prisma.playlist.create({
      data: {
        name, 
        description, 
        ownerId: +id
      }
    })
  } catch (err) {
    next(err)
  }
})