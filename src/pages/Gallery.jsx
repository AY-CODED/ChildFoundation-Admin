import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Gallery() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Assuming you have an endpoint /api/posts that returns all posts
                const res = await api.get('/posts');
                // Filter out posts that don't have an image
                setPosts(res.data.filter(post => post.imageUrl));
            } catch (err) {
                console.error("Failed to load gallery:", err);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">YMCH Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden border">
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-48 object-cover" 
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{post.title}</h3>
                            <p className="text-sm text-gray-600 truncate">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}