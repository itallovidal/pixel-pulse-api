-- CreateTable
CREATE TABLE "wishplay" (
    "id" TEXT NOT NULL,
    "gameID" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishplay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wishplay" ADD CONSTRAINT "wishplay_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
