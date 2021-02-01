module.exports = {
    devServer: {
        proxy: {
            'http://localhost:3000': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            },
            'http://localhost:3003': {
                target: 'http://localhost:3003',
                changeOrigin: true
            },
            'http://localhost:4000': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true
            }
        }
    }
}
