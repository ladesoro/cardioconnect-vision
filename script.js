const maturityProof = {
      fragmented: {
        label: "Before MVP",
        title: "What “fragmented” looks like in the field",
        copy: "The point is not to criticize the past — it is to show why the MVP mattered. It reduced reliance on disconnected coordination and gave the team a more consistent operating surface.",
        items: [
          ["Intake / request", "Case details start in multiple places", "Procedure requests, non-procedure work, and availability signals may be captured across emails, texts,calls, or spreadsheets."],
          ["Schedule & assign", "Coverage decisions require manual context gathering", "Schedulers and managers reconcile availability, qualifications, physician familiarity, and conflicts through separate coordination."],
          ["Prepare", "Readiness lives in people’s heads", "Rep familiarity, account nuance, inventory awareness, and physician preferences rely heavily on tribal knowledge."],
          ["Document & close", "Procedure documentation sits apart from scheduling", "Known scheduling data does not automatically carry into the case record or worksheet process."],
          ["Inventory", "Follow-up happens after the fact", "Device use, expiration opportunity, and replenishment needs are discovered downstream rather than connected to the case flow."],
          ["Leadership insight", "Activity is hard to interpret quickly", "Leaders need to stitch together reports and anecdotes to understand demand, workload, and account signals."]
        ]
      },
      visible: {
        label: "Current MVP foundation",
        title: "What “visible” means in real field work",
        copy: "This layer makes the current investment concrete: intake, schedule, assignment, and mobile access create the shared foundation that future capabilities build from.",
        items: [
          ["Intake / request", "Structured intake foundation", "Create a consistent way to capture procedures, non-procedure activities, and unavailable time across divisions, with customizations where needed."],
          ["Schedule & assign", "Shared schedule visibility and recommended coverage", "Teams can see planned work, assignments, and status, while case-by-case recommendations suggest top-fit reps."],
          ["Prepare", "The field can see what is coming", "Mobile schedule access helps reps understand upcoming work and coverage expectations."],
          ["Document & close", "Early linkage to procedure records", "AFS procedure workflows create and link to the Procedure Worksheet and prefill a limited set of fields from scheduling context. CRM remains separate through IRIS REX."],
          ["Inventory", "Foundation for future inventory readiness", "The MVP does not manage inventory directly, but structured case timing, location, and procedure context create a foundation for future inventory planning."],
          ["Leadership insight", "A clearer operating picture", "The MVP creates better source data for understanding field work, schedule coverage, sales forecasting, and team activity."]
        ]
      },
      connected: {
        label: "Next Phase",
        title: "What “connected” could unlock next",
        copy: "This is where the experience moves beyond schedule visibility. The case becomes a more consistent cardiology-wide lifecycle and data model that carries context across CRM, EP, and Watchman while allowing division-specific details where needed.",
        items: [
          ["Intake / request", "Connected request management", "Identify potential duplicates, support concomitant procedure intake and linking, and explore customer-facing request processes that reduce manual collection and re-entry for field teams."],
          ["Schedule & assign", "Smarter assignment across the field schedule", "Assignment logic can expand beyond a single case to consider team capacity, related procedures, travel patterns, workload balance, and downstream coverage impacts.."],
          ["Prepare", "Case readiness summary", "Reps see procedure details, account context, physician preferences, required inventory, and risk flags before arrival."],
          ["Document & close", "In-app procedure management across divisions", "Documentation moves into the connected case workflow with richer prefill, physician and account templates, device and document capture, and guided review before submission."],
          ["Inventory", "Replenishment is triggered by documented use", "Confirmed device use can reduce expiration risk and prepare replenishment when par levels fall."],
          ["Leadership insight", "Field activity creates customer context", "Operational events become signals for territory/account follow-up, not just completed work items."]
        ]
      },
      intelligent: {
        label: "Future horizon",
        title: "What “intelligent” could mean over time",
        copy: "This is the assistive layer: not automation for its own sake, but recommendations that help field teams make faster, better, and more explainable decisions.",
        items: [
          ["Intake / request", "Assisted work creation", "Use Assist to create work order events from plain-language inputs such as chat, voice, texts, emails, or other request sources, making it faster to turn incoming needs into structured field work."],
          ["Schedule & assign", "Assist-driven schedule optimization", "Assist can proactively detect coverage risk, recommend or draft schedule changes, and rebalance work across teams as case volume, availability, urgency, travel, and workload conditions change."],
          ["Prepare", "Readiness risk alerts", "The system can surface missing information, inventory gaps, documentation prep, and account-specific context before the procedure."],
          ["Document & close", "Guided documentation and review", "Assist can help identify missing fields, suggest physician-specific templates, extract data from scans, and flag complaint, proof-of-delivery, or inventory follow-up needs."],
          ["Inventory", "Proactive replenishment and expiration management", "The system can recommend when to use expiring inventory, replenish below-par accounts, or review upcoming demand."],
          ["Leadership insight", "From reports to next-best action", "Managers and territory leaders see workload, demand, readiness, and account signals with recommended follow-up paths."]
        ]
      }
    };

    function renderMaturity(stage) {
      const data = maturityProof[stage] || maturityProof.visible;
      document.getElementById("mmProofLabel").textContent = data.label;
      document.getElementById("mmProofTitle").textContent = data.title;
      document.getElementById("mmProofCopy").textContent = data.copy;
      document.getElementById("mmProofGrid").innerHTML = data.items.map(([kicker, headline, body]) => `
        <article class="mm-proof-item">
          <span>${kicker}</span>
          <strong>${headline}</strong>
          <p>${body}</p>
        </article>
      `).join("");
      document.querySelectorAll(".mm-stage-card").forEach(btn => {
        const active = btn.dataset.stage === stage;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", String(active));
      });
    }

    document.querySelectorAll(".mm-stage-card").forEach(btn => {
      btn.addEventListener("click", () => renderMaturity(btn.dataset.stage));
    });
    renderMaturity("visible");

    const outcomeContent = {
      continue: {
        label: "Continue",
        title: "Inventory readiness",
        body: "When procedure documentation and inventory context are connected, device use can immediately inform stock position, expiration risk, and replenishment needs.",
        bullets: [
          "Reps can see expiring inventory before the case, not after it becomes a problem",
          "Device use can update the account inventory picture without extra follow-up",
          "Replenishment needs can be prepared from the completed case context"
        ]
      },
      act: {
        label: "Act",
        title: "Account signals",
        body: "When field activity connects over time, territory leaders can see patterns that may indicate changing demand, physician needs, or accounts that require proactive support.",
        bullets: [
          "Territory leaders can spot urgent add-on patterns before they become recurring fire drills",
          "Field teams can see where coverage needs may point to strained support models",
          "Account conversations can be grounded in actual procedure activity, not anecdotal updates"
        ]
      },
      lead: {
        label: "Lead",
        title: "Leadership visibility",
        body: "When scheduling, readiness, documentation, and follow-through share context, leaders can understand operational health across teams without piecing together disconnected reports.",
        bullets: [
          "Managers can identify coverage gaps and capacity pressure earlier",
          "Leaders can understand workload in the context of real procedure demand",
          "Teams can see readiness, follow-through, and account activity in one operating view"
        ]
      }
    };

    function renderOutcome(key) {
      const data = outcomeContent[key] || outcomeContent.continue;
      const panel = document.getElementById('outcomePanel');
      if (!panel) return;
      panel.innerHTML = `
        <span class="outcome-label">${data.label}</span>
        <h3>${data.title}</h3>
        <p>${data.body}</p>
        <ul class="outcome-bullets">
          ${data.bullets.map(item => `<li>${item}</li>`).join('')}
        </ul>
      `;
      document.querySelectorAll('.outcome-tab').forEach(btn => {
        const active = btn.dataset.outcome === key;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', String(active));
      });
    }
    document.querySelectorAll('.outcome-tab').forEach(btn => {
      btn.addEventListener('click', () => renderOutcome(btn.dataset.outcome));
    });
    renderOutcome('continue');

    document.querySelectorAll('.workflow-card').forEach(card => {
      const video = card.querySelector('video');
      const play = () => {
        card.classList.add('is-playing');
        video.play().catch(() => {});
      };
      const stop = () => {
        card.classList.remove('is-playing');
        video.pause();
        video.currentTime = 0;
      };
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focusin', play);
      card.addEventListener('focusout', stop);
      card.addEventListener('click', () => video.paused ? play() : stop());
    });
    // Toggle system chips for presentation emphasis
document.querySelectorAll(".system-pill").forEach((pill) => {
  pill.setAttribute("role", "button");
  pill.setAttribute("tabindex", "0");

  pill.addEventListener("click", () => {
    pill.classList.toggle("is-selected");
  });

  pill.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pill.classList.toggle("is-selected");
    }
  });
});
// Reveal bonus workflow cards
const moreWorkflowToggle = document.querySelector(".more-workflows-toggle");
const moreWorkflowPanel = document.querySelector("#moreWorkflowPanel");

if (moreWorkflowToggle && moreWorkflowPanel) {
  moreWorkflowToggle.addEventListener("click", () => {
    const isOpen = moreWorkflowToggle.getAttribute("aria-expanded") === "true";

    moreWorkflowToggle.setAttribute("aria-expanded", String(!isOpen));
    moreWorkflowPanel.hidden = isOpen;
    moreWorkflowToggle.textContent = isOpen ? "Want to see more?" : "Show less";

    if (!isOpen) {
      moreWorkflowPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isFlipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(isFlipped));
  });
});
const moreValueToggle = document.querySelector(".more-value-toggle");
const moreValuePanel = document.querySelector("#moreValuePanel");

if (moreValueToggle && moreValuePanel) {
  moreValueToggle.addEventListener("click", () => {
    const isOpen = moreValueToggle.getAttribute("aria-expanded") === "true";

    moreValueToggle.setAttribute("aria-expanded", String(!isOpen));
    moreValuePanel.hidden = isOpen;
    moreValueToggle.textContent = isOpen
      ? "Explore more future value opportunities"
      : "Show fewer value opportunities";

    if (!isOpen) {
      moreValuePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}
const proposalOpen = document.querySelector(".proposal-drawer-open");
const proposalDrawer = document.querySelector(".proposal-drawer");
const proposalBackdrop = document.querySelector(".proposal-backdrop");
const proposalClose = document.querySelector(".proposal-drawer-close");

function openProposalDrawer() {
  if (!proposalDrawer || !proposalBackdrop) return;

  proposalBackdrop.hidden = false;
  proposalDrawer.classList.add("is-open");
  proposalDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("proposal-open");
}

function closeProposalDrawer() {
  if (!proposalDrawer || !proposalBackdrop) return;

  proposalDrawer.classList.remove("is-open");
  proposalDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("proposal-open");

  window.setTimeout(() => {
    proposalBackdrop.hidden = true;
  }, 250);
}

proposalOpen?.addEventListener("click", openProposalDrawer);
proposalClose?.addEventListener("click", closeProposalDrawer);
proposalBackdrop?.addEventListener("click", closeProposalDrawer);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProposalDrawer();
  }
});
document.querySelectorAll(".implementation-expand-card").forEach((card) => {
  const button = card.querySelector(".implementation-expand-toggle");
  const list = card.querySelector(".implementation-example-list");

  if (!button || !list) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    list.hidden = isOpen;
    button.textContent = isOpen ? "Show examples" : "Hide examples";
  });
});
const maturityRoadmapToggle = document.querySelector(".maturity-roadmap-toggle");
const maturityRoadmapPanel = document.querySelector("#maturityRoadmapPanel");

if (maturityRoadmapToggle && maturityRoadmapPanel) {
  maturityRoadmapToggle.addEventListener("click", () => {
    const isOpen = maturityRoadmapToggle.getAttribute("aria-expanded") === "true";

    maturityRoadmapToggle.setAttribute("aria-expanded", String(!isOpen));
    maturityRoadmapPanel.hidden = isOpen;
    maturityRoadmapToggle.textContent = isOpen
      ? "View Capability Roadmap"
      : "Hide Capability Roadmap";

    if (!isOpen) {
      maturityRoadmapPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}
const heroLeverContent = {
  cost: {
    title: "Cost avoidance",
    description:
      "Connect scheduled cases, documented device use, expiration risk, par levels, and replenishment signals so teams can act before product expires or stock falls below need."
  },
  capacity: {
    title: "Capacity optimization",
    description:
      "Give leaders better visibility into rep workload, availability, geography, qualifications, case demand, and coverage pressure so work can be balanced before adding headcount."
  },
  productivity: {
    title: "Productivity",
    description:
      "Reduce manual coordination and duplicate entry across intake, scheduling, prep, documentation, and downstream handoffs."
  },
  growth: {
    title: "Growth enablement",
    description:
      "Turn field activity, procedure volume, coverage patterns, physician context, and account signals into insight that helps teams prioritize customer follow-up."
  }
};

const heroLeverButtons = document.querySelectorAll(".hero-lever");
const heroLeverDetail = document.querySelector(".hero-lever-detail");
const heroLeverTitle = document.querySelector("#heroLeverTitle");
const heroLeverDescription = document.querySelector("#heroLeverDescription");

heroLeverButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isAlreadyActive = button.classList.contains("is-active");
    const lever = button.dataset.lever;
    const content = heroLeverContent[lever];

    heroLeverButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });

    if (isAlreadyActive) {
      if (heroLeverDetail) heroLeverDetail.hidden = true;
      return;
    }

    if (!content || !heroLeverDetail || !heroLeverTitle || !heroLeverDescription) return;

    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");

    heroLeverTitle.textContent = content.title;
    heroLeverDescription.textContent = content.description;
    heroLeverDetail.hidden = false;
  });
});
const whyNowToggle = document.querySelector(".why-now-toggle");
const whyNowPanel = document.querySelector("#whyNowPanel");

if (whyNowToggle && whyNowPanel) {
  whyNowToggle.addEventListener("click", () => {
    const isOpen = whyNowToggle.getAttribute("aria-expanded") === "true";

    whyNowToggle.setAttribute("aria-expanded", String(!isOpen));
    whyNowPanel.hidden = isOpen;
  });
}
