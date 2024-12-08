'use client';

import { useContext, useState } from "react";
import { PageContext } from "./Page";
import Image from "next/image";

export default function UserPage() {
    const data = useContext(PageContext).data;
    const user = data.selectedUser;

    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const parent = document.querySelector(`[data-profile="${user.username}"]`);
        if (parent) parent.setAttribute('data-loaded', 'true');
        setIsLoaded(true);
        event.currentTarget.setAttribute('data-loaded', 'true');
    };

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = "https://quizmatix.com/client/assets/profiles/default-profile.png";
    };

    const image = (
        <Image
            data-loaded='false'
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="rounded-full mx-auto data-[loaded=false]:opacity-0"
            src={`https://quizmatix.com/client/assets/profiles/${user.profile_img}`}
            width={window.innerWidth - 128}
            height={-1}
            alt=""
        />
    );

    return (
        <main className="mb-[5rem] page-container">
            <div className="relative pt-5 mb-5 h-[calc(100vw-128px)] w-full">
                {isLoaded ? (
                    <div className="ring-primary mx-auto ring-offset-base-100 w-[calc(100vw-128px)] ring rounded-full ring-offset-2">
                        <div
                            data-loaded='false'
                            className="z-10 w-[calc(100vw-128px)] h-full data-[loaded=false]:skeleton data-[loaded=false]:shrink-0 data-[loaded=false]:rounded-full absolute top-5 left-1/2 transform -translate-x-1/2"
                            data-profile={user.username}
                        ></div>
                        {image}
                    </div>
                ) : (
                    <>
                        <div
                            data-loaded='false'
                            className="z-10 w-[calc(100vw-128px)] h-full data-[loaded=false]:skeleton data-[loaded=false]:shrink-0 data-[loaded=false]:rounded-full absolute top-5 left-1/2 transform -translate-x-1/2"
                            data-profile={user.username}
                        ></div>
                        {image}
                    </>
                )}
            </div>
            <div className="username font-bold text-3xl pt-5 mb-3 text-center">{user.username}</div>
            <div className="flex justify-center mb-3 px-2">
                <div className="badge badge-primary w-full">{user.point}</div>
            </div>
            <div className="flex justify-center px-2 mb-5">
                <div className="badge badge-primary w-1/2 me-1">
                    <div className="whitespace-nowrap">{user.tag}</div>
                </div>
                <div className="badge badge-primary w-1/2 ms-1">
                    {user.star ? (
                        <div className="text-warning flex">
                            {[...Array(user.star).keys()].map((key: number) => (
                                <svg
                                    key={key}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="size-4"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs mx-auto place-items-center mb-5">
                <button className="btn btn-secondary w-full max-w-xs">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                    >
                        <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 13c.552 0 1.01-.452.9-.994a5.002 5.002 0 0 0-9.802 0c-.109.542.35.994.902.994h8ZM12.5 3.5a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 .75-.75Z" />
                    </svg>
                    Arkadaş Ekle
                </button>
                <button className="btn btn-accent w-full max-w-xs">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.5 1.709a.75.75 0 0 1 1 0 8.963 8.963 0 0 0 4.84 2.217.75.75 0 0 1 .654.72 10.499 10.499 0 0 1-5.647 9.672.75.75 0 0 1-.694-.001 10.499 10.499 0 0 1-5.647-9.672.75.75 0 0 1 .654-.719A8.963 8.963 0 0 0 7.5 1.71ZM8 5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 5Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Engelle
                </button>
            </div>
            <div className="mx-3">
                <div className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" defaultChecked />
                    <div className="collapse-title text-xl font-medium">Rozetler</div>
                    <div className="collapse-content">
                        <p></p>
                    </div>
                </div>
            </div>
        </main>
    );
}
