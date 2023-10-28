/*
  Warnings:

  - You are about to drop the column `user_name` on the `arc_user` table. All the data in the column will be lost.
  - You are about to drop the `_arc_articleToarc_tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `arc_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_arc_articleToarc_tag" DROP CONSTRAINT "_arc_articleToarc_tag_A_fkey";

-- DropForeignKey
ALTER TABLE "_arc_articleToarc_tag" DROP CONSTRAINT "_arc_articleToarc_tag_B_fkey";

-- AlterTable
ALTER TABLE "arc_user" DROP COLUMN "user_name",
ADD COLUMN     "username" VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE "_arc_articleToarc_tag";

-- CreateTable
CREATE TABLE "arc_article_to_tag" (
    "postId" BIGINT NOT NULL,
    "tagId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "arc_article_to_tag_pkey" PRIMARY KEY ("postId","tagId")
);

-- AddForeignKey
ALTER TABLE "arc_article_to_tag" ADD CONSTRAINT "arc_article_to_tag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "arc_article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arc_article_to_tag" ADD CONSTRAINT "arc_article_to_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "arc_tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
