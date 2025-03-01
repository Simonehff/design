//Copy tooltip

function copyToClipboard(button) {
  // Get the text inside the span (simone)
  const textToCopy = button.querySelector('.copy-text').innerText;
  const icon = button.querySelector('.copy-icon');
  const tooltip = button.querySelector('.tooltip');

  // Copy to clipboard
  navigator.clipboard.writeText(textToCopy).then(() => {
      // Change the button icon to check-square and show the tooltip
      button.innerHTML = '<i class="far fa-check-square copy-icon mr-10"></i> <span class="copy-text">simonehff@gmail.com</span> <span class="tooltip" style="visibility: visible; opacity: 1;">Copied!</span>';

      // Reset back to envelope icon after 1.5 seconds
      setTimeout(() => {
          button.innerHTML = '<i class="far fa-envelope copy-icon mr-10"></i> <span class="copy-text">simonehff@gmail.com</span> <span class="tooltip" style="visibility: hidden; opacity: 0;">Copied!</span>';
      }, 1500);
  });
}



// Fade functionality
document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".fade-in-container");
    let totalDelay = 0; // Controls when each container starts

    containers.forEach((container) => {
        const staticChildren = container.querySelectorAll(".fade-in-static");  // Target .fade-in-static
        const movingChildren = container.querySelectorAll(".fade-in");  // Target .fade-in

        // Apply fade-in static effect with incremental delay for each element
        staticChildren.forEach((child, index) => {
            // Apply delay with 100ms more for each .fade-in-static
            const delay = index * 20 + (index * 160);  // 100ms extra for each static child
            setTimeout(() => {
                child.style.opacity = "1";
                child.style.transitionDelay = `${delay}ms`;
            }, totalDelay);
        });

        // Apply fade-in + move effect for .fade-in elements
        movingChildren.forEach((child, index) => {
            const delay = index * 80; // For staggered animation of .fade-in elements
            setTimeout(() => {
                child.style.opacity = "1";
                child.style.transform = "translateY(0)"; // Move to the original position (final state)
                child.style.transitionDelay = `${delay}ms`;
            }, totalDelay + staticChildren.length * 20 + 100); // Adjust timing for next set of elements
        });

        // Increase total delay for next set of elements
        totalDelay += staticChildren.length * 20 + movingChildren.length * 80 + 280; // Faster transition
    });
});



//Autoplay video only when visible
document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll("video");

    if (videos.length === 0) return; // Exit if no videos are found

    // Create an observer for each video element
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target; // Get the video element
            if (entry.intersectionRatio >= 0.8) {
                video.play();
            } else if (entry.intersectionRatio < 0.2) {
                video.pause();
                video.currentTime = 0; // Reset video to the start when mostly out of view
            }
        });
    }, {
        threshold: [0.2, 0.8] // Detect when video is 80% visible or when it drops below 20%
    });

    // Observe each video
    videos.forEach(video => observer.observe(video));
});
