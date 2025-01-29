const ErrorPage = () => {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "10px" , color:"red"}}>Oops! Something went wrong.</h1>
                <p style={{ fontSize: "1.2rem" }}>Sorry, the page you are looking for does not exist.</p>
            </div>
        </div>
    );
}

export default ErrorPage;
