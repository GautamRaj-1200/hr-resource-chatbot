import faiss
import numpy as np

def create_faiss_index(embeddings: np.ndarray):
    dim = embeddings.shape[1]

    index = faiss.IndexFlatIP(dim)
    
    faiss.normalize_L2(embeddings)

    index.add(embeddings)
    return index
