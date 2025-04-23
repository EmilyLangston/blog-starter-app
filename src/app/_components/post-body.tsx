import Image from "next/image";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  ogImage: string;
};

export function PostBody({ content, ogImage }: Props) {
  return (
    <div className="flex justify-between gap-6 max-w-4xl mx-auto">
      <div className="flex-shrink-0 w-[200px] h-[200px]">
        <Image
          src={ogImage || ""}
          alt="OgImage"
          width={200}
          height={200}
          className="rounded shadow object-cover w-full h-full"
        />
      </div>
      <div
        className={`${markdownStyles["markdown"]} flex-1`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
