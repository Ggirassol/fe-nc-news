import './ArticleCard.css'

const ArticleCard = ( {article} ) => {
    return (
        <li className="article-card">
        <img src={article.article_img_url} />
        <h3>{article.title}</h3>
        <p><span className="topic">{article.topic}</span><span className='float-right'>{article.created_at.slice(0,10)}</span></p>
        </li>
    )
}

export default ArticleCard;

// picture
// title
// topic and date (left & right)