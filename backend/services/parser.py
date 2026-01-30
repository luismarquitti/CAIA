import frontmatter
from typing import Dict, Any

def parse_artifact(content: str) -> Dict[str, Any]:
    """
    Parses a markdown string and extracts its frontmatter metadata.
    
    Args:
        content (str): Raw markdown content.
        
    Returns:
        Dict[str, Any]: A dictionary containing 'metadata' (dict) and 'content' (str).
    """
    try:
        post = frontmatter.loads(content)
        return {
            "metadata": post.metadata,
            "content": post.content
        }
    except Exception as e:
        # Fallback for non-frontmatter files
        return {
            "metadata": {},
            "content": content,
            "error": str(e)
        }
