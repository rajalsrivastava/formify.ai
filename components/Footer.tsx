import { DollarSign, Mail, ShieldCheck, Book } from "lucide-react";
import { FaGithub } from "react-icons/fa"; // Using react-icons for GitHub
import React from "react";

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-6 border-t">
      <a
        className="flex items-center gap-1 hover:underline hover:underline-offset-4"
        href="/docs"
      >
        <Book size={16} />
        Documentation
      </a>
      <a
        className="flex items-center gap-1 hover:underline hover:underline-offset-4"
        href="https://github.com/rajalsrivastava/formify.ai"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={16} />
        GitHub
      </a>
      <a
        className="flex items-center gap-1 hover:underline hover:underline-offset-4"
        href="/pricing"
      >
        <DollarSign size={16} />
        Pricing
      </a>
      <a
        className="flex items-center gap-1 hover:underline hover:underline-offset-4"
        href="/contact"
      >
        <Mail size={16} />
        Contact Support
      </a>
      <a
        className="flex items-center gap-1 hover:underline hover:underline-offset-4"
        href="/privacy"
      >
        <ShieldCheck size={16} />
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
