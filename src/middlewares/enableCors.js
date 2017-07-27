import { isProd } from '../config'

const enableCors = (req, res, next) => {
  const allowedOrigins = ["https://www.getthrough.it", "https://getthrough.it"]
  const origin = req.headers.origin

  if (isProd && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  } else {
    // console.log(origin)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  }
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  next()
}

export default enableCors
