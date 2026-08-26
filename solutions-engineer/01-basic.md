# Client Meeting Template — Solutions Engineer

Your meeting has one objective:

**Understand enough to decide what happens next.**

Not to solve everything during the call.

### The 15–20 minute structure

|    Time | Stage               | Goal                                    |
| ------: | ------------------- | --------------------------------------- |
| 1–2 min | **Context**         | Why are we here?                        |
| 3–5 min | **Problem**         | What isn't working / what do they need? |
| 5–8 min | **Technical facts** | Environment, network, versions, errors  |
| 3–4 min | **Confirm**         | Make sure you understood correctly      |
|   2 min | **Next action**     | Who does what next?                     |

---

## 1. OPEN — 1 minute

Don't start interrogating them about servers.

Start with:

> "Before we get into the technical details, could you briefly explain what you're trying to achieve?"

Then:

> "And what's currently preventing you from doing that?"

Now you have:

**GOAL → BLOCKER**

That's the foundation of the conversation.

---

# 2. UNDERSTAND THE PROBLEM

You don't need 20 questions.

Use this pattern:

### WHAT → WHEN → ERROR → CHANGE

> **What** exactly isn't working?

> **When** does the problem happen?

> What **error/message/behavior** do you see?

> Did anything **change** before this started?

Example:

Client:

> "Zeuz isn't connecting."

❌ **Wrong response**

> "Okay, probably firewall. Can you check port X?"

You've already made an assumption.

✅ **Better**

> "When you say it isn't connecting, which component is unable to connect to which?"

Client:

> "The agent can't connect to the server."

Now you're investigating a **specific connection**, not "Zeuz doesn't work."

---

# 3. GET THE TECHNICAL FACTS

This will become extremely important once you learn networking.

Think:

### SYSTEM → SOFTWARE → NETWORK → SECURITY → ERROR

You don't necessarily ask every question. Pick what's relevant.

**System**

> What OS/server are you running?

> Is this VM, physical server, cloud, or on-premise?

**Software**

> What version are you installing?

> Is this a fresh installation or an upgrade?

**Network**

> Can the machine reach the required server?

> Is there a proxy, VPN or restricted network?

**Security**

> Is there a firewall?

> Are there organizational security restrictions?

**Evidence**

> Could you share the exact error/log?

Notice the difference:

❌ "Can you explain what happened?"

✅ "Could you show me the exact error?"

**Evidence beats descriptions.**

---

# 4. DIG DEEPER ONLY WHEN NECESSARY

Don't blindly ask **"Why?" five times**.

That can become annoying.

Instead use:

### "What makes you think that?"

Example:

Client:

> "It's a network problem."

You:

> "What makes you think it's network-related?"

Client:

> "It works from another server but not this one."

That's valuable evidence.

Then investigate the difference between those environments.

---

# 5. CONFIRM YOUR UNDERSTANDING

This is one of your most important habits.

Before discussing solutions:

> "Just to confirm my understanding..."

Then summarize in **20–30 seconds**:

> "You're installing version X on Ubuntu. Installation completes, but the agent can't reach the application server. Another machine on the same environment works, and the problem appears specific to this server. Correct?"

Client:

> "Yes."

Now everyone agrees on the problem.

---

# 6. DON'T DESIGN THE SOLUTION LIVE UNLESS YOU KNOW

This matters especially because you're coming from software engineering.

Engineers naturally want to immediately solve things.

Client:

> "Could we change the authentication system?"

❌

> "Yeah, we could probably modify X and use Y..."

Now you've accidentally made a commitment.

Better:

> "Technically that sounds possible. Let me confirm the impact with the team before committing to an approach."

Your responsibility is:

**Understand → Validate → Coordinate → Respond**

not:

**Guess → Promise → Make engineering deal with it.**

---

# 7. END EVERY MEETING WITH ACTIONS

Never finish with:

> "Okay, we'll investigate."

That's vague.

Instead:

> "So we have three next steps."

**Client:** provide logs/configuration.

**You:** reproduce/verify the issue.

**Engineering:** investigate component X if reproduction confirms it.

Then:

> "I'll update you once we've verified the cause."

Everyone knows what happens next.

---

# Your Mental Model

Memorize this rather than memorizing dozens of questions:

```text
GOAL
 ↓
PROBLEM
 ↓
ENVIRONMENT
 ↓
EVIDENCE
 ↓
ROOT CAUSE
 ↓
CONFIRM
 ↓
ACTION
```

Or even shorter:

### **G → P → E → E → C → A**

**Goal → Problem → Environment → Evidence → Confirm → Action**

---

# Wrong vs Right

| ❌ Don't                      | ✅ Do                            |
| ---------------------------- | ------------------------------- |
| Ask 30 prepared questions    | Follow the problem              |
| Immediately troubleshoot     | Understand first                |
| Assume technical causes      | Ask for evidence                |
| Ask vague questions          | Ask specific questions          |
| Use lots of jargon           | Speak client's language         |
| Explain everything you know  | Explain only what's relevant    |
| Promise features immediately | Confirm feasibility first       |
| Turn meeting into debugging  | Collect enough evidence         |
| Say "we'll check"            | Assign concrete next actions    |
| Let meeting wander           | Bring conversation back to goal |

## Most important principle

A successful client meeting isn't:

> **"I demonstrated how technically knowledgeable I am."**

It's:

> **"We understood the exact problem, gathered the necessary information, agreed on what happens next, and didn't waste the client's time."**

And for your particular job, I'd add one habit after every installation-related issue:

**Ask: "How can we prevent this meeting from being necessary next time?"**

Maybe the answer is better documentation, a pre-installation checker, automated network tests, an Ansible/PowerShell installer, clearer error messages, or changes to the product itself. That's how you gradually move from **supporting installations → engineering reliable installations**.
