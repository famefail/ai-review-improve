interface BranchBadgeProps {
  branch: string;
}

export default function BranchBadge({ branch }: BranchBadgeProps) {
  return (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
      {branch}
    </span>
  );
}
