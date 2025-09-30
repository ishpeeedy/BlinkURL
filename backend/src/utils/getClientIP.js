const getClientIP = (req) => {
    // Log all possible sources for debugging
    const sources = {
        'x-forwarded-for': req.headers['x-forwarded-for'],
        'x-real-ip': req.headers['x-real-ip'],
        'x-client-ip': req.headers['x-client-ip'],
        'cf-connecting-ip': req.headers['cf-connecting-ip'],
        'render-proxy-ip': req.headers['render-proxy-ip'],
        'true-client-ip': req.headers['true-client-ip'],
        'connection.remoteAddress': req.connection?.remoteAddress,
        'socket.remoteAddress': req.socket?.remoteAddress,
        'req.ip': req.ip
    };

    console.log('IP Sources:', sources);

    // If x-forwarded-for contains multiple IPs, get the first one (client's real IP)
    const forwardedFor = req.headers['x-forwarded-for']?.split(',')[0]?.trim();

    // Array of headers that might contain the real IP, in order of preference
    const ipSources = [
        forwardedFor,
        req.headers['x-real-ip'],
        req.headers['x-client-ip'],
        req.headers['cf-connecting-ip'],
        req.headers['render-proxy-ip'],
        req.headers['true-client-ip'],
        req.connection?.remoteAddress,
        req.socket?.remoteAddress,
        req.ip
    ];

    // Get first valid IP from the sources
    const realIP = ipSources
        .find(ip => ip && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1');

    // Log the result
    console.log('Selected IP:', realIP || 'No valid IP found');

    // If no real IP found, return the original IP (even if it's localhost)
    return realIP || req.ip || req.connection?.remoteAddress;
};

export default getClientIP;