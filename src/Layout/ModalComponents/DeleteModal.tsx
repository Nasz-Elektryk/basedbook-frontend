import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import ProjectClasses from "../../Sites/Project/Project.module.css";
import PostClasses from "../../Sites/Spotted/Spotted.module.css";
import classes from "./Modal.module.css";
import Button from "../../Components/Button";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const DeleteModal = (props: any) => {
  const [removableContent, setRemovableContent] = useState([
    {
      id: 69,
      createdAt: new Date(""),
      author: {
        id: -100,
        name: "",
        surname: "",
        username: "",
      },
      hasAlreadyApplied: true,
      title: "",
      text: "",
      isAnonymous: false,
      isLiked: false,
      likes: 69,
      username: "",
      isOwned: true,
    },
  ]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const getRemovablePost = async () => {
      await fetch(`http://localhost:3000/spotted/post/${props.postId}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => setRemovableContent([res]))
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          props.showSpinner(false);
          setShowContent(true);
        });
    };

    const getRemovableProject = async () => {
      await fetch(`http://localhost:3000/project/${props.projectId}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          setRemovableContent([res]);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          props.showSpinner(false);
          setShowContent(true);
        });
    };
    props.projectId !== -100 ? getRemovableProject() : getRemovablePost();
  }, [props]);

  const deleteProject = async (id: any) => {
    const deleteProject = {
      projectId: id,
    };
    const response = await fetch(`http://localhost:3000/project`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify(deleteProject),
    });
    if (response.ok) {
      NotificationManager.success(
        "Uda??o si?? usun???? projekt.",
        "Sukces!",
        3000
      );
      window.location.reload();
    } else {
      NotificationManager.error("Wyst??pi?? b????d!", "B????d!", 3000);
      props.onClose();
    }
  };

  const deletePost = async (id: any) => {
    const deleteProject = {
      projectId: id,
    };
    const response = await fetch(`http://localhost:3000/spotted/post`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify(deleteProject),
    });
    if (response.ok) {
      NotificationManager.success(
        "Uda??o si?? usun???? post.",
        "Sukces!",
        3000
      );
      window.location.reload();
    } else {
      NotificationManager.error("Wyst??pi?? b????d!", "B????d!", 3000);
      props.onClose();
    }
  };

  return (
    <>
      <p>Usu?? {props.projectId !== -100 ? "projekt" : "post"}</p>
      {showContent &&
        (props.projectId !== -100
          ? removableContent.map((project, index) => {
              return (
                <div key={index}>
                  <Wrapper className={ProjectClasses.post}>
                    <div className={ProjectClasses.topData}>
                      {project.author && (
                        <Link to={`/profile/${project.author.id}`}>
                          <Icon.PersonFill />
                          <p>{project.author.username}</p>
                        </Link>
                      )}
                      <div>
                        <Icon.CalendarDate />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <Icon.Clock />
                        {new Date(project.createdAt).getHours() + ":"}
                        {new Date(project.createdAt).getMinutes() < 10
                          ? "0" + new Date(project.createdAt).getMinutes()
                          : new Date(project.createdAt).getMinutes()}
                      </div>
                    </div>
                    <h2>{project.title}</h2>
                    <p className={ProjectClasses.content}>{project.text}</p>
                    <div className={ProjectClasses.bottomDataDisabled}>
                      <Button
                        buttonText="Zapisz si??"
                        className="gray disabled"
                      />
                      <Icon.PersonFillCheck />
                    </div>
                  </Wrapper>
                  <p className={classes.warning}>
                    Czy chesz usun???? powy??szy projekt? Tej decyzji nie mo??na
                    cofn????!
                  </p>
                  <Button
                    buttonText="Usu?? projekt"
                    className="alternate"
                    onClick={() => deleteProject(project.id)}
                  />
                </div>
              );
            })
          : removableContent.map((post, index) => {
              return (
                <div key={index}>
                  <Wrapper className={PostClasses.post}>
                    <div className={PostClasses.topData}>
                      {post.isAnonymous ? (
                        <div>
                          <Icon.PersonFill />
                          <p>
                            {post.isAnonymous ? "Anonim" : post.author.username}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <Link to={`/profile/${post.author.id}`}>
                            <Icon.PersonFill />
                            <p>
                              {post.isAnonymous
                                ? "Anonim"
                                : post.author.username}
                            </p>
                          </Link>
                        </div>
                      )}
                      <div>
                        <Icon.CalendarDate />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <Icon.Clock />
                        {new Date(post.createdAt).getHours() + ":"}
                        {new Date(post.createdAt).getMinutes() < 10
                          ? "0" + new Date(post.createdAt).getMinutes()
                          : new Date(post.createdAt).getMinutes()}
                      </div>
                    </div>
                    <div className={PostClasses.content}>{post.text}</div>
                  </Wrapper>
                  <p className={classes.warning}>
                    Czy chesz usun???? powy??szy post? Tej decyzji nie mo??na
                    cofn????!
                  </p>
                  <Button
                    buttonText="Usu?? post"
                    className="alternate"
                    onClick={() => deletePost(post.id)}
                  />
                </div>
              );
            }))}
    </>
  );
};

export default DeleteModal;
