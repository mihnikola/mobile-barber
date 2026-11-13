import { Avatar } from "@/components/ui/Avatar";

/**
 * @deprecated Use `<Avatar name=... />` from `@/components/ui`.
 * Mapping kept 1:1: profile → md, compact reservation details (otherServices) → sm, otherwise lg.
 * As before, renders nothing when `otherServices` is undefined and it is not a list/profile avatar.
 */
const SharedImageInitials = ({
  name,
  profile = false,
  otherServices,
  listEmployers,
}: {
  name?: string;
  profile?: boolean;
  otherServices?: unknown[];
  listEmployers?: boolean;
}) => {
  if (listEmployers || otherServices?.length === 0) {
    return <Avatar name={name} size={profile ? "md" : "lg"} />;
  }
  if (otherServices && otherServices.length > 0) {
    return <Avatar name={name} size="sm" />;
  }
  return null;
};

export default SharedImageInitials;
