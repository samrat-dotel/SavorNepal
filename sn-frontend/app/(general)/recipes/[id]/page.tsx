"use client";

import React, { useState } from "react";
import { use } from "react";
import recipeData from "@/components/data/data";
import styles from "./RecipeDetail.module.css";
import Image from "next/image";

interface Params {
  id: string;
}

interface Reply {
  user: string;
  text: string;
  upvotes: number;
  timestamp: string;
  id: number;
  active?: boolean;
  showReplyInput?: boolean;
}

interface Comment {
  user: string;
  text: string;
  upvotes: number;
  timestamp: string;
  id: number;
  replies: Reply[];
  active?: boolean;
  showReplyInput?: boolean;
}

export default function RecipeDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = use(params);
  const recipe = recipeData.find((r) => r.id === parseInt(id));
  const [newComment, setNewComment] = useState("");

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB").replace(/\//g, ".");
  }

  const [commentsState, setCommentsState] = useState<Comment[]>(() =>
    recipe
      ? recipe.comments.map((c, ci) => ({
          ...c,
          id: ci,
          showReplyInput: false,
          replies: c.replies.map((r, ri) => ({ ...r, id: ri, showReplyInput: false })),
        }))
      : []
  );

  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  if (!recipe) return <div className={styles.notFound}>Recipe not found.</div>;

  const toggleCommentUpvote = (commentId: number) => {
    setCommentsState((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              upvotes: comment.upvotes + (comment.active ? -1 : 1),
              active: !comment.active,
            }
          : comment
      )
    );
  };

  const toggleReplyUpvote = (commentId: number, replyId: number) => {
    setCommentsState((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === replyId
                ? {
                    ...reply,
                    upvotes: reply.upvotes + (reply.active ? -1 : 1),
                    active: !reply.active,
                  }
                : reply
            ),
          };
        }
        return comment;
      })
    );
  };

  const toggleReplyInput = (commentId: number, replyId?: number) => {
    setCommentsState((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          if (replyId === undefined) {
            return { ...comment, showReplyInput: !comment.showReplyInput };
          } else {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, showReplyInput: !reply.showReplyInput }
                  : reply
              ),
            };
          }
        }
        return comment;
      })
    );
  };

  const handleReplySubmit = (commentId: number, replyId?: number) => {
    const key = replyId === undefined ? `${commentId}-main` : `${commentId}-${replyId}`;
    const replyText = replyTexts[key];
    if (!replyText || replyText.trim() === "") return;

    const newReply: Reply = {
      user: "CurrentUser",
      text: replyText,
      upvotes: 0,
      timestamp: new Date().toISOString().slice(0, 10),
      id: Date.now(),
    };

    setCommentsState((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
            showReplyInput: false,
          };
        }
        return comment;
      })
    );

    setReplyTexts((prev) => ({ ...prev, [key]: "" }));
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;

    const newCommentObj: Comment = {
      user: "CurrentUser",
      text: newComment,
      upvotes: 0,
      timestamp: new Date().toISOString().slice(0, 10),
      id: commentsState.length,
      replies: [],
    };

    setCommentsState((prev) => [...prev, newCommentObj]);
    setNewComment("");
  };

  return (
    <main className={styles.main}>
            <div className={styles.container}>
      <div className={styles.banner}>
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={800}
          height={400}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <h2 className={styles.title}>{recipe.name}</h2>
        <p className={styles.author}><strong>Author:</strong> {recipe.author}</p>
        <p className={styles.review}><strong>Review:</strong> {recipe.review}</p>
        <p className={styles.rating}>⭐{recipe.ratings}</p>
      </div>

      <div className={styles.descriptionText}>
  <h3>Description</h3>
  <ul className={styles.description}>
          <p>{recipe.description}</p>
  </ul>
</div>

      <div className={styles.section}>
        <h3>🛒 Shopping List</h3>
        <ul className={styles.ingredients}>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3>🍳 Preparation</h3>
        <ol className={styles.instructions}>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className={styles.section}>
        <h3>💬 Comments</h3>

        {commentsState.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.headerRow}>
              <div>
                <strong className={styles.username}>{comment.user}</strong>
                <div className={styles.date}>{formatDate(comment.timestamp)}</div>
              </div>
            </div>
            <p className={styles.commentText}>{comment.text}</p>
            <div className={styles.actionRow}>
              <span className={styles.reply} onClick={() => toggleReplyInput(comment.id)}>Reply</span>
              <span
                className={`${styles.heart} ${comment.active ? styles.active : ""}`}
                onClick={() => toggleCommentUpvote(comment.id)}
              >
                💚 {comment.upvotes}
              </span>
            </div>
            {comment.showReplyInput && (
              <div className={styles.replyInput}>
                <input
                style={{color: "black", backgroundColor: "white", fontSize: "16px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
                  type="text"
                  placeholder="Write a reply..."
                  value={replyTexts[`${comment.id}-main`] || ""}
                  onChange={(e) =>
                    setReplyTexts((prev) => ({
                      ...prev,
                      [`${comment.id}-main`]: e.target.value,
                    }))
                  }
                />
                <button onClick={() => handleReplySubmit(comment.id)} style={{fontSize: "16px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}>Submit</button>
              </div>
            )}
            {comment.replies.map((reply) => (
              <div key={reply.id} className={styles.replyBlock}>
                <div className={styles.headerRow}>
                  <div>
                    <strong className={styles.username}>{reply.user}</strong>
                    <div className={styles.date}>{formatDate(reply.timestamp)}</div>
                  </div>
                </div>
                <p className={styles.commentText}>{reply.text}</p>
                <div className={styles.actionRow}>
                  <span className={styles.reply} onClick={() => toggleReplyInput(comment.id, reply.id)}>Reply</span>
                  <span
                    className={`${styles.heart} ${reply.active ? styles.active : ""}`}
                    onClick={() => toggleReplyUpvote(comment.id, reply.id)}
                  >
                    💚 {reply.upvotes}
                  </span>
                </div>
                {reply.showReplyInput && (
                  <div className={styles.replyInput}>
                    <input
                        style={{color: "black", backgroundColor: "white", fontSize: "16px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
                      type="text"
                      placeholder="Write a reply..."
                      value={replyTexts[`${comment.id}-${reply.id}`] || ""}
                      onChange={(e) =>
                        setReplyTexts((prev) => ({
                          ...prev,
                          [`${comment.id}-${reply.id}`]: e.target.value,
                        }))
                      }
                    />
                    <button onClick={() => handleReplySubmit(comment.id, reply.id)} style={{fontSize: "16px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}>Submit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={styles.commentInput}
            placeholder="Type your comment here..."
          />
          <button className={styles.uploadButton} onClick={handleCommentSubmit}>Submit</button>
        </div>
      </div>
    </div>
    </main>
  );
}