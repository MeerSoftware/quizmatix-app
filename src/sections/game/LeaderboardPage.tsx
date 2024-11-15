import React from 'react';

interface LeaderboardEntry {
    name: string;
    score: number;
}

interface LeaderboardProps {
    leaderboardData: LeaderboardEntry[];
}

const LeaderboardPage: React.FC<LeaderboardProps> = ({ leaderboardData }) => {
    return (
        <main className="h-full mb-28">
            <h1 className="font-bold text-3xl pt-12 text-center">Lider Tablosu</h1>
            <div className="flex justify-center mt-8 px-4">
                <div className="overflow-x-auto w-full max-w-4xl bg-base-200 shadow-xl rounded-lg">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>İsim</th>
                                <th>Puan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardData.map((entry, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{entry.name}</td>
                                    <td>{entry.score}0000000000000000000000</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default LeaderboardPage;
