const ErrorBanner = ({error}: {error: string}) => {
    if (!error) return null;
    return (
        <div>
            <p>{error}</p>
        </div>
    )
}

export default ErrorBanner