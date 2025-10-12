// components/collections-modal.tsx

import { X } from "lucide-react"; // Use X icon for close button

interface CollectionsModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

// This Modal creates the overlay and houses your collection grid
export function CollectionsModal({ children, onClose }: CollectionsModalProps) {
  return (
    // Outer Overlay: Fixed position, full screen, dark background
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose} // Close when clicking the dark background
    >
      {/* Inner Modal Container: The pop-up box */}
      <div
        // Positioning: large width, 80% height, centered
        className="relative bg-background rounded-xl shadow-2xl max-w-6xl w-full h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-3xl font-extrabold tracking-tight">Browse Collections</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children} {/* This will be your AllCollections component */}
        </div>
      </div>
    </div>
  );
}