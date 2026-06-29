import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
const fadeUp = {
  hidden: { opacity: 0, y: 56, scale: 0.9, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.82, rotateX: 12 },
  visible: { opacity: 1, scale: 1, rotateX: 0 }
};
const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 }
};
const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};
const variantMap = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight
};
function Reveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.85,
  once = true
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once, margin: "-80px" },
      variants: variantMap[variant],
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
      children
    }
  );
}
function Stagger({ children, className, stagger = 0.08 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-60px" },
      variants: {
        hidden: {},
        visible: { transition: { staggerChildren: stagger } }
      },
      children
    }
  );
}
function StaggerItem({ children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className,
      variants: fadeUp,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
      children
    }
  );
}
export {
  Reveal as R,
  Stagger as S,
  StaggerItem as a
};
