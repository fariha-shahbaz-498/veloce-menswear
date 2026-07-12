// Remove or comment out your old app.listen loop:
// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => { ... });

// 5. Root route can act as a fallback diagnostic if needed, 
// but Vercel routing rules will prioritize index.html first.
app.get('/api', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Welcome to the Veloce Menswear Backend API engine.' 
  });
});

// Handle unhandled promise rejections cleanly
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Critical Error: ${err.message}`);
  process.exit(1);
});

// Export the app instance for Vercel Serverless Functions
module.exports = app;