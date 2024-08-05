import React from 'react'

function linkCards({ links }) {

    const { title, slug, target, views, createdAt } = links
    return (
        <div>
            {title}
            {slug}
            {target}
            {views}
            {createdAt}
        </div>
    )
}

export default linkCards
