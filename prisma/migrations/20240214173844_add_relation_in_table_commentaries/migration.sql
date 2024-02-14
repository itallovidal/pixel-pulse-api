-- AddForeignKey
ALTER TABLE "commentaries" ADD CONSTRAINT "commentaries_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
