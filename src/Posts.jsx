import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

const api = async () => {
    const response = await axios.get("https://apkform-2.onrender.com/");
    return response.data;
};

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api().then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch((err) => {
            console.error("Error fetching data:", err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '1.25rem', fontWeight: '600' }}>Loading...</div>;
    }

    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem', fontWeight: '700' }}>Posts</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.posts.map((post, postIndex) => (
                            <div 
                                key={postIndex} 
                                style={{ 
                                    width: '320px', 
                                    backgroundColor: '#fff', 
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                                    borderRadius: '8px', 
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {post.type === 'image' && (
                                    <img style={{ width: '100%', height: '180px', objectFit: 'cover' }} src={post.url} alt="Post" />
                                )}
                                {post.type === 'video' && (
                                    <video 
                                        style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                                        muted 
                                        controls 
                                        onMouseEnter={(e) => e.currentTarget.play()}
                                        onMouseLeave={(e) => e.currentTarget.pause()}
                                    >
                                        <source src={post.url} type="video/mp4" />
                                    </video>
                                )}
                                <div style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '0' }}>{item.name || 'Untitled Post'}</h3>
                                        <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={item.image} alt="User" />
                                    </div>
                                    <p style={{ color: '#4A4A4A', marginTop: '4px', fontSize: '0.875rem' }}>{post.caption || 'No description available.'}</p>
                                    <span style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginTop: '4px' }}>Type: {post.type}</span>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}