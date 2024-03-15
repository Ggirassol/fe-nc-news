const ErrorPage = ({ beError }) => {
    
    return beError ? <h3>{beError.response.data.msg}</h3> : <h3>Page not found</h3>
};

export default ErrorPage;