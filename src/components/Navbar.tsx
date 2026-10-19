// Ported from kavish3D-Portofolio (MIT, (c) Rajesh Chityal)
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import "./styles/Navbar.css";
import { getSmoother, setSmoother } from "./utils/scrollSmoother";
import { useLoading } from "../context/LoadingProvider";
import { destroyHomeScroll, resetHomeMotionState } from "./utils/homeMotionReset";
import { portfolioData } from "../data/portfolioData";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const socials = [
  { label: "LinkedIn", href: portfolioData.profile.linkedinUrl },
  { label: "GitHub", href: portfolioData.profile.githubUrl },
  { label: "Instagram", href: portfolioData.profile.instagramUrl },
  { label: "Email", href: portfolioData.profile.emailUrl },
];

// Magnetic hover — attaches to a button element
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}

// Top-bar nav link with blob fill + magnetic
function TopNavBtn({
  label,
  onClick,
  isActive,
}: {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  isActive?: boolean;
}) {
  const ref = useMagnetic(0.3);
  return (
    <button
      ref={ref}
      type="button"
      className={`top-nav-link${isActive ? " active" : ""}`}
      onClick={onClick}
    >
      {label}
      <span className="top-active-dot" aria-hidden="true" />
    </button>
  );
}

// Sidebar nav link with dot indicator + magnetic
function SideNavBtn({
  label,
  onClick,
  style,
  isActive,
}: {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  isActive?: boolean;
}) {
  const ref = useMagnetic(0.18);
  return (
    <button
      ref={ref}
      type="button"
      className={`nav-link${isActive ? " active" : ""}`}
      style={style}
      onClick={onClick}
    >
      <span className="side-dot" />
      {label}
    </button>
  );
}

export const Navbar = () => {
  const { isLoading } = useLoading();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const hamburgerRef = useMagnetic(0.3);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    if (!wrapper || !content) return;

    const createdSmoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    document.body.style.overflowY = "auto";
    setSmoother(createdSmoother);
    resetHomeMotionState();
    createdSmoother.scrollTop(0);
    window.scrollTo(0, 0);
    createdSmoother.paused(isLoading);

    const handleResize = () => {
      ScrollSmoother.refresh(true);
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflowY = "";
      destroyHomeScroll();
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const rafId = requestAnimationFrame(() => {
      getSmoother()?.paused(false);
      getSmoother()?.scrollTop(0);
      window.scrollTo(0, 0);
      ScrollTrigger.refresh(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const past = window.scrollY > 80;
      setScrolled(past);
      if (!past) setIsMenuOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getSmoother()?.paused(isMenuOpen);
  }, [isMenuOpen]);

  const attachMagneticHover = useCallback(
    (el: HTMLElement, strength: number) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
      };

      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    []
  );

  useEffect(() => {
    if (isMenuOpen && closeButtonRef.current) {
      return attachMagneticHover(closeButtonRef.current, 0.25);
    }
  }, [isMenuOpen, attachMagneticHover]);

  useEffect(() => {
    if (isMenuOpen) {
      const socialLinks = document.querySelectorAll(".nav-social-link");
      const cleanups: (() => void)[] = [];

      socialLinks.forEach((link) => {
        const cleanup = attachMagneticHover(link as HTMLElement, 0.2);
        cleanups.push(cleanup);
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }
  }, [isMenuOpen, attachMagneticHover]);

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToTarget = (target: string | number) => {
    const smoother = getSmoother();
    if (smoother) {
      smoother.scrollTo(target, true);
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const goHome = () => {
    closeMenu();
    setActiveItem("Home");
    scrollToTarget(0);
  };

  const handleNav = (label: string, target: string | number) => {
    closeMenu();
    setActiveItem(label);
    scrollToTarget(target);
  };

  const navMenuItems = [
    { label: "Home", target: 0 },
    { label: "Work", target: "#projects" },
    { label: "About", target: "#about" },
    { label: "What I Can Build", target: "#what-can-i-build" },
    { label: "Journey", target: "#journey" },
    { label: "Contact", target: "#contact" },
  ];

  return (
    <>
      {/* ── Top navbar (visible before scroll) ── */}
      <header className={`top-navbar${scrolled ? " hidden" : ""}`}>
        <button
          type="button"
          className="top-navbar-logo"
          onClick={goHome}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <span className="logo-symbol">©</span>
          <span className="logo-texts">
            <span className={`logo-codeby${logoHovered ? " out" : ""}`}>
              &nbsp;Code by Neeraj
            </span>
            <span className={`logo-kavish${logoHovered ? " in" : ""}`}>
              &nbsp;Narendra Yadav
            </span>
          </span>
        </button>

        <nav className="top-navbar-links">
          <TopNavBtn
            label="Work"
            onClick={() => handleNav("Work", "#projects")}
            isActive={activeItem === "Work"}
          />
          <TopNavBtn
            label="About"
            onClick={() => handleNav("About", "#about")}
            isActive={activeItem === "About"}
          />
          <TopNavBtn
            label="Contact"
            onClick={() => handleNav("Contact", "#contact")}
            isActive={activeItem === "Contact"}
          />
        </nav>
      </header>

      {/* ── Hamburger button (visible after scroll) ── */}
      <button
        ref={hamburgerRef}
        type="button"
        className={`btn-hamburger${scrolled ? " visible" : ""}${isMenuOpen ? " menu-open" : ""}`}
        onClick={() => setIsMenuOpen((v) => !v)}
        aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isMenuOpen}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* ── Overlay ── */}
      <div
        className={`nav-overlay${isMenuOpen ? " active" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Side drawer ── */}
      <nav className={`side-nav${isMenuOpen ? " active" : ""}`} aria-hidden={!isMenuOpen}>
        <button
          ref={closeButtonRef}
          type="button"
          className="side-nav-close"
          onClick={closeMenu}
          aria-label="Close navigation"
          style={{
            position: "absolute",
            top: "20px",
            right: "28px",
            zIndex: 10,
            background: "none",
            border: "none",
            color: "#eae5ec",
            fontSize: "28px",
            cursor: "pointer",
            willChange: "transform",
            padding: "0",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
        <div className="nav-section">
          <h5 className="nav-heading">Navigation</h5>
          {navMenuItems.map((item, i) => (
            <SideNavBtn
              key={item.label}
              label={item.label}
              style={{ transitionDelay: isMenuOpen ? `${0.05 + i * 0.05}s` : "0s" }}
              onClick={() => handleNav(item.label, item.target)}
              isActive={activeItem === item.label}
            />
          ))}
        </div>

        <div className="nav-section nav-socials">
          <h5 className="nav-heading">Socials</h5>
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
              style={{ transitionDelay: isMenuOpen ? `${0.25 + i * 0.05}s` : "0s" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
