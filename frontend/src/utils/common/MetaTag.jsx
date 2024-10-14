import React from "react";
import MetaTags from "react-meta-tags"

function MetaTag({ title }) {
    return (
        <MetaTags>
            <title>{title} | Central Admin</title>
        </MetaTags>
    )
}

export default React.memo(MetaTag);
