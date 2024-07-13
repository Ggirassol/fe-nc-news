import  "../ErrorSnackBar/ErrorSnackBar.css"

const ErrorAddArticle = ( {msg} ) => {
    return (
        <div id="error-snackbar">{msg.response.data.msg}</div>
    )
}

export default ErrorAddArticle;