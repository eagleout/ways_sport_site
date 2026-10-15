import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/lib/content";
import { ArrowIcon, Meter } from "./Icons";

export default function CourseCard({
  course,
  index,
  headingLevel = 2,
}: {
  course: Course;
  index: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={`/cours/${course.slug}`} className="course-card" data-reveal data-delay={String((index % 3) * 0.08)} data-cursor="Entrer">
      <div className="course-card__media frame" aria-hidden="true">
        <Image
          src={course.image.src}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, (max-width: 1100px) 50vw, 33vw"
          style={{ objectPosition: course.image.focus }}
        />
      </div>
      <div className="course-card__top">
        <span className="kicker">{String(index + 1).padStart(2, "0")}</span>
        <span className="course-card__tag">{course.tag}</span>
      </div>
      <div className="course-card__body">
        <Heading className="display">{course.name}</Heading>
        <p>{course.short}</p>
        <div className="course-card__foot">
          <Meter level={course.level} light />
          <span className="course-card__go">
            Entrer dans le cours
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
