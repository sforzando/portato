module.exports = async (ctx, next) => {
  await next()
    .catch((err) => {
      console.error(err)

      if (err.status) {
        ctx.status = err.status
        ctx.body = {
          message: err.message
        }
      } else {
        ctx.status = 500
        ctx.body = {
          message: 'Internal Server Error'
        }
      }
    })
}
