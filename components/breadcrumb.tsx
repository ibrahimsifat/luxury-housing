import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-center space-x-2 space-x-reverse text-sm text-slate-600 ${className}`}
      aria-label="مسار التنقل"
      role="navigation"
    >
      <ol className="flex items-center space-x-2 space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronLeft className="w-4 h-4 mx-2 text-slate-400" />
            )}
            {item.current ? (
              <span className="text-slate-900 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
