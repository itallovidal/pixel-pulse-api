-- CreateTable
CREATE TABLE "commentaries" (
    "id" TEXT NOT NULL,
    "gameID" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commentaries_pkey" PRIMARY KEY ("id")
);
