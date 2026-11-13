import { EmptyState } from "@/components/ui";

/** "No free slots" message under the calendar (design system empty state). */
const NotSummary = ({ text }: { text: string }) => <EmptyState icon="calendar" title={text} />;

export default NotSummary;
