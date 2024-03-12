import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css'

const ArticleCard = ( {article} ) => {   
    return (
        <li className="article-card">
        <Link to={`/articles/${article.article_id}`} article={article}>
            <img src={article.article_img_url} />
            <h3>{article.title}</h3>
        </Link>
        <p><span className="topic">{article.topic}</span><span className='float-right'>{article.created_at.slice(0,10)}</span></p>
        </li>
    )
}

export default ArticleCard;