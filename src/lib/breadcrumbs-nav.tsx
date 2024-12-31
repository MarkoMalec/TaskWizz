"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

type BreadcrumbNavigationProps = {
  className?: string;
};

const BreadcrumbNavigation = ({ className }: BreadcrumbNavigationProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter((segment) => segment !== "");

    const breadcrumbs = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      const isLastItem = index === segments.length - 1;

      return {
        href,
        label,
        isLastItem,
      };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (!breadcrumbs.length || !mounted) {
    return null;
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs.map(({ href, label, isLastItem }) => {
          return (
            <BreadcrumbItem key={href}>
              {isLastItem ? (
                <BreadcrumbPage>{label.replace(/-/g, " ")}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={href}>
                    {label.replace(/-/g, "")}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNavigation;
