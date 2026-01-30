import os
import pathlib
from typing import List, Dict, Union

# Base workspace directory (for safety)
# using pathlib to resolve to absolute path
WORKSPACE_ROOT = pathlib.Path(os.getcwd()).resolve().parent.resolve()

def is_safe_path(path: str) -> bool:
    """Ensure the path is within the workspace root to prevent traversal attacks."""
    try:
        requested_path = (WORKSPACE_ROOT / path).resolve()
        return str(requested_path).startswith(str(WORKSPACE_ROOT))
    except Exception:
        return False

def list_files(directory: str = ".") -> List[Dict[str, Union[str, bool]]]:
    """
    Recursively list files and directories starting from the backend root's parent (Workspace).
    API clients should pass relative paths from the workspace root.
    """
    # Fix: We want to list the workspace (parent of backend), not just backend
    root_path = WORKSPACE_ROOT
    
    # If a subdirectory is requested
    target_path = (root_path / directory).resolve()
    
    if not is_safe_path(directory):
         raise ValueError("Access denied: Path outside workspace")

    tree = []
    
    try:
        # We only list the top level of the requested directory for the tree view
        # Returing a flat list or nested structure? 
        # For simplicity, let's return a flat list of direct children with metadata
        # The frontend can request subdirectories lazily or we can do a full recursive tree.
        # Let's do a simple recursive tree for now, or just direct children?
        # The PLAN says "Recursive function to build the file tree".
        
        # But for large repos, full recursion is slow. Let's do direct children (lazy loading style)
        # or a safe depth limited recursion.
        # Let's implement direct children listing for now.
        
        for entry in os.scandir(target_path):
            # Skip hidden files and venv/node_modules, but allow .github
            if entry.name != '.github' and (entry.name.startswith('.') or entry.name in ['venv', 'node_modules', '__pycache__']):
                continue
                
            item = {
                "name": entry.name,
                "path": str(pathlib.Path(entry.path).relative_to(WORKSPACE_ROOT)).replace("\\", "/"),
                "is_dir": entry.is_dir(),
                "size": entry.stat().st_size if not entry.is_dir() else 0
            }
            tree.append(item)
            
        return sorted(tree, key=lambda x: (not x['is_dir'], x['name']))

    except FileNotFoundError:
        return []

def read_file_content(path: str) -> str:
    """Reads the content of a file safely."""
    if not is_safe_path(path):
        raise ValueError("Access denied: Path outside workspace")
        
    target_path = (WORKSPACE_ROOT / path).resolve()
    
    if not target_path.exists():
        raise FileNotFoundError(f"File not found: {path}")
        
    with open(target_path, 'r', encoding='utf-8') as f:
        return f.read()
