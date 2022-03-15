import { useState, useEffect } from "react";
import Link from "next/link";
import Seo from "../components/Seo";
import { useRouter } from "next/router";

// 구조분해할당으로 리팩토링해보기
export default function Home() {
    const [movies, setMovies] = useState();
    const router = useRouter();
    const onClick = (id) => {
        router.push({
            pathname: `movies/${id}`,
            query: {
                id,
                title: "potato",
            },
        });
    };
    useEffect(() => {
        (async () => {
            const response = await fetch("/api/movies");
            const data = await response.json();
            setMovies(data.results);
        })();
    }, []);
    return (
        <div className="container">
            <Seo title="Home" />
            {!movies && <h4>Loading.....</h4>}
            {movies?.map((movie) => (
                <div
                    onClick={() => onClick(movie.id)}
                    className="movie"
                    key={movie.id}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                    <h4>
                        <Link href={`/movies/${movie.id}`}>
                            <a>{movie.original_title}</a>
                        </Link>
                    </h4>
                </div>
            ))}

            <style jsx>
                {`
                    .container {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        padding: 20px;
                        gap: 20px;
                    }
                    .movie {
                        cursor: pointer;
                    }
                    .movie img {
                        max-width: 100%;
                        border-radius: 12px;
                        transition: transform 0.2s ease-in-out;
                        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                    }
                    .movie:hover img {
                        transform: scale(1.05) translateY(-10px);
                    }
                    .movie h4 {
                        font-size: 18px;
                        text-align: center;
                    }
                `}
            </style>
        </div>
    );
}
