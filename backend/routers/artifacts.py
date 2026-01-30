from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

from services.files import list_files, read_file_content
from services.parser import parse_artifact

router = APIRouter(prefix="/api", tags=["artifacts"])

@router.get("/tree")
def get_file_tree(path: str = ".") -> List[Dict[str, Any]]:
    """
    List files and directories in the workspace.
    """
    try:
        return list_files(path)
    except ValueError as e:
        raise HTTPException(status_code=403, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/file/{file_path:path}")
def get_file(file_path: str) -> Dict[str, Any]:
    """
    Get the content and metadata of a specific file.
    """
    try:
        content = read_file_content(file_path)
        
        # If it's a markdown file, parse metadata
        if file_path.endswith(".md"):
            parsed = parse_artifact(content)
            return {
                "path": file_path,
                "type": "markdown",
                **parsed
            }
        else:
            return {
                "path": file_path,
                "type": "text",
                "content": content,
                "metadata": {}
            }
            
    except ValueError as e:
        raise HTTPException(status_code=403, detail=str(e))
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
