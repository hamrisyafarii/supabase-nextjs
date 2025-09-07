import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";
import Header from "~/components/layouts/Header";
import Footer from "~/components/layouts/Footer";

type PageContainerProps = {
  withHeader?: boolean;
  withFooter?: boolean;
};

export const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PageContainerProps
>(
  (
    { className, children, withHeader = true, withFooter = true, ...props },
    ref
  ) => {
    return (
      <div className="h-full w-full">
        {withHeader && <Header />}
        <main
          ref={ref}
          className={cn("flex flex-col min-h-screen", className)}
          {...props}
        >
          {children}
        </main>
        {withFooter && <Footer />}
      </div>
    );
  }
);

PageContainer.displayName = "PageContainer";
