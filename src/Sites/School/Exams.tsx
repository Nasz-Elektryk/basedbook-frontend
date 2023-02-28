import React, {useEffect, useState} from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";
import classes from "./Exams.module.css";
import Wrapper from "../../Layout/Wrapper";

const Exams = () => {
    const [exams, setExams] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllExams();
    }, []);

    async function getAllExams() {
        setIsLoading(true);
        try {
            await fetch("http://localhost:3000/school/exams", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setExams(data));
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    return (
        <>
            {!isLoading && (
                <div className={classes.exams}>
                    {exams.map((exam) => {
                        return (
                            <div key={exam.id}>
                                <Wrapper className={exam.type === "Sprawdzian" ? classes.exam : classes.quiz}>
                                    <h2>{exam.subject}</h2>
                                    <h3>{exam.type}</h3>
                                    <p>{exam.deadline}</p>
                                    <p>{exam.description}</p>
                                    <p className={classes.teacher}>{exam.teacherName}</p>
                                </Wrapper>
                            </div>
                        );
                    })}
                </div>
            )}
            {isLoading && <LoadingSpinner/>}
        </>
    );
};

export default Exams;
