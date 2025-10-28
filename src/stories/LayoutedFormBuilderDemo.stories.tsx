import { Meta, StoryObj } from "@storybook/react";
import LayoutedFormBuilderDemo from "./demo/LayoutedFormBuilderDemo";
import { FormGroup } from "../components/FormBuilder/layoutedTypes";

const meta = {
  title: "Layouted Form Builder",
  component: LayoutedFormBuilderDemo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LayoutedFormBuilderDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicLayoutedForm: Story = {
  args: {
    // title: "Basic Layouted Form",
    // description: "A simple 2-column layout with basic fields",
    groups: [
      {
        group: "group_1",
        // title: "Personal Information",
        // description: "Enter your personal details",
        layout: {
          columns: 2,
          gap: "medium",
          border: "none",
        },
        fields: [
          {
            type: "input",
            name: "first_name",
            label: "First Name",
            required: true,
            position: { row: 1, col: 1, span: 1 },
          },
          {
            type: "input",
            name: "last_name",
            label: "Last Name",
            required: true,
            position: { row: 1, col: 2, span: 1 },
          },
          {
            type: "input",
            mode: "email",
            name: "email",
            label: "Email",
            required: true,
            position: { row: 2, col: 1, span: 2 },
          },
          {
            type: "textarea",
            name: "bio",
            label: "Bio",
            description: "Tell us about yourself",
            position: { row: 3, col: 1, span: 2 },
          },
        ],
      },
    ] as FormGroup[],
  },
};

export const MultiGroupForm: Story = {
  args: {
    title: "Multi-Group Form",
    description: "Form with multiple groups and different layouts",
    groups: [
      {
        group: "personal",
        title: "Personal Information",
        description: "Your basic details",
        layout: {
          columns: 2,
          gap: "medium",
          border: "light",
        },
        fields: [
          {
            type: "input",
            name: "first_name",
            label: "First Name",
            required: true,
            position: { row: 1, col: 1, span: 1 },
          },
          {
            type: "input",
            name: "last_name",
            label: "Last Name",
            required: true,
            position: { row: 1, col: 2, span: 1 },
          },
          {
            type: "date",
            name: "birth_date",
            label: "Birth Date",
            position: { row: 2, col: 1, span: 1 },
          },
          {
            type: "select",
            name: "gender",
            label: "Gender",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ],
            position: { row: 2, col: 2, span: 1 },
          },
        ],
      },
      {
        group: "contact",
        title: "Contact Information",
        description: "How can we reach you?",
        layout: {
          columns: 3,
          gap: "large",
          border: "medium",
        },
        fields: [
          {
            type: "input",
            mode: "email",
            name: "email",
            label: "Email",
            required: true,
            position: { row: 1, col: 1, span: 2 },
          },
          {
            type: "input",
            mode: "tel",
            name: "phone",
            label: "Phone",
            position: { row: 1, col: 3, span: 1 },
          },
          {
            type: "textarea",
            name: "address",
            label: "Address",
            position: { row: 2, col: 1, span: 3 },
          },
        ],
      },
      {
        group: "preferences",
        title: "Preferences",
        layout: {
          columns: 1,
          gap: "small",
          border: "none",
        },
        fields: [
          {
            type: "checkbox",
            name: "newsletter",
            label: "Subscribe to newsletter",
            position: { row: 1, col: 1, span: 1 },
          },
          {
            type: "switch",
            name: "notifications",
            label: "Enable notifications",
            description: "Receive push notifications",
            position: { row: 2, col: 1, span: 1 },
          },
        ],
      },
    ] as FormGroup[],
  },
};

export const ComplexLayoutForm: Story = {
  args: {
    title: "Complex Layout",
    description: "Showcasing different field spans and positioning",
    groups: [
      {
        group: "complex",
        title: "Product Information",
        description: "Complex layout with various field spans",
        layout: {
          columns: 4,
          gap: "medium",
          border: "strong",
        },
        fields: [
          {
            type: "input",
            name: "product_name",
            label: "Product Name",
            required: true,
            position: { row: 1, col: 1, span: 3 },
          },
          {
            type: "input",
            mode: "number",
            name: "price",
            label: "Price",
            required: true,
            position: { row: 1, col: 4, span: 1 },
          },
          {
            type: "select",
            name: "category",
            label: "Category",
            options: [
              { label: "Electronics", value: "electronics" },
              { label: "Clothing", value: "clothing" },
              { label: "Books", value: "books" },
            ],
            position: { row: 2, col: 1, span: 2 },
          },
          {
            type: "select",
            name: "status",
            label: "Status",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
            position: { row: 2, col: 3, span: 2 },
          },
          {
            type: "textarea",
            name: "description",
            label: "Description",
            description: "Detailed product description",
            position: { row: 3, col: 1, span: 4 },
          },
          {
            type: "wysiwyg",
            name: "rich_description",
            label: "Rich Description",
            description: "Rich text description with formatting",
            position: { row: 4, col: 1, span: 4 },
          },
        ],
      },
    ] as FormGroup[],
  },
};

export const SingleColumnForm: Story = {
  args: {
    title: "Single Column Layout",
    description: "Simple single column form",
    groups: [
      {
        group: "single",
        title: "Feedback Form",
        description: "Share your thoughts with us",
        layout: {
          columns: 1,
          gap: "large",
          border: "medium",
        },
        fields: [
          {
            type: "input",
            name: "name",
            label: "Your Name",
            required: true,
            position: { row: 1, col: 1, span: 1 },
          },
          {
            type: "input",
            mode: "email",
            name: "email",
            label: "Email Address",
            required: true,
            position: { row: 2, col: 1, span: 1 },
          },
          {
            type: "select",
            name: "rating",
            label: "Overall Rating",
            options: [
              { label: "⭐", value: "1" },
              { label: "⭐⭐", value: "2" },
              { label: "⭐⭐⭐", value: "3" },
              { label: "⭐⭐⭐⭐", value: "4" },
              { label: "⭐⭐⭐⭐⭐", value: "5" },
            ],
            position: { row: 3, col: 1, span: 1 },
          },
          {
            type: "textarea",
            name: "feedback",
            label: "Your Feedback",
            description: "Please share your detailed feedback",
            position: { row: 4, col: 1, span: 1 },
          },
        ],
      },
    ] as FormGroup[],
  },
};

export const ConditionalGroupsForm: Story = {
  args: {
    title: "Conditional Groups Demo",
    description: "Groups that show/hide based on form values",
    groups: [
      {
        group: "basic_info",
        title: "Basic Information",
        description: "Tell us about yourself",
        layout: {
          columns: 2,
          gap: "medium",
          border: "light",
        },
        fields: [
          {
            type: "input",
            name: "name",
            label: "Full Name",
            required: true,
            position: { row: 1, col: 1, span: 1 },
          },
          {
            type: "select",
            name: "user_type",
            label: "I am a...",
            required: true,
            options: [
              { label: "Individual", value: "individual" },
              { label: "Business", value: "business" },
              { label: "Student", value: "student" },
            ],
            position: { row: 1, col: 2, span: 1 },
          },
        ],
      },
      {
        group: "business_info",
        title: "Business Information",
        description: "Additional details for business users",
        conditions: {
          user_type: "business",
        },
        layout: {
          columns: 2,
          gap: "medium",
          border: "medium",
        },
        fields: [
          {
            type: "input",
            name: "company_name",
            label: "Company Name",
            required: true,
            position: { row: 1, col: 1, span: 1 },
          },
          {
            type: "input",
            name: "tax_id",
            label: "Tax ID",
            position: { row: 1, col: 2, span: 1 },
          },
          {
            type: "input",
            name: "website",
            label: "Website",
            position: { row: 2, col: 1, span: 2 },
          },
        ],
      },
      {
        group: "student_info",
        title: "Student Information",
        description: "Details for student users",
        conditions: {
          user_type: "student",
        },
        layout: {
          columns: 2,
          gap: "medium",
          border: "medium",
        },
        fields: [
          {
            type: "input",
            name: "school_name",
            label: "School/University",
            required: true,
            position: { row: 1, col: 1, span: 1 },
          },
          {
            type: "input",
            name: "student_id",
            label: "Student ID",
            position: { row: 1, col: 2, span: 1 },
          },
          {
            type: "select",
            name: "grade_level",
            label: "Grade Level",
            options: [
              { label: "High School", value: "high_school" },
              { label: "Undergraduate", value: "undergraduate" },
              { label: "Graduate", value: "graduate" },
            ],
            position: { row: 2, col: 1, span: 2 },
          },
        ],
      },
      {
        group: "premium_features",
        title: "Premium Features",
        description: "Available for business and graduate students",
        conditions: {
          anyOf: [{ user_type: "business" }, { grade_level: "graduate" }],
        },
        layout: {
          columns: 1,
          gap: "small",
          border: "strong",
        },
        fields: [
          {
            type: "checkbox",
            name: "premium_support",
            label: "Enable Premium Support",
            position: { row: 1, col: 1, span: 1 },
          },
          {
            type: "checkbox",
            name: "advanced_analytics",
            label: "Enable Advanced Analytics",
            position: { row: 2, col: 1, span: 1 },
          },
        ],
      },
    ] as FormGroup[],
  },
};

export const ChallengeCompletion: Story = {
  args: {
    title: "Challenge Completion",
    description: "Challenge completion form",
    groups: [
      {
        group: "rewards_claimed",
        layout: {
          columns: 2,
          gap: "medium",
          border: "none",
        },
        fields: [
          {
            name: "claim_type",
            label: "Claim Type",
            description: "Type of rewards claimed to match",
            type: "select",
            options: [
              { label: "Total Count", value: "total_count" },
              { label: "Specific Rewards", value: "specific_rewards" },
            ],
            required: true,
            position: { row: 1, col: 1, span: 2 },
          },
          {
            name: "condition_operator",
            label: "Condition Operator",
            description: "How to compare the total rewards claimed count",
            type: "select",
            options: [
              { label: "Equals", value: "equals" },
              { label: "Greater Than", value: "greater_than" },
              { label: "Less Than", value: "less_than" },
              {
                label: "Greater Than or Equal",
                value: "greater_than_or_equal",
              },
              { label: "Less Than or Equal", value: "less_than_or_equal" },
            ],
            required: true,
            position: { row: 2, col: 1, span: 1 },
            conditions: {
              allOf: [
                {
                  claim_type: "total_count",
                },
              ],
            },
          },
          {
            name: "condition_operator",
            label: "Condition Operator",
            description: "How to match the specific rewards",
            type: "select",
            options: [
              { label: "Includes", value: "includes" },
              { label: "Excludes", value: "excludes" },
            ],
            required: true,
            position: { row: 2, col: 1, span: 1 },
            conditions: {
              allOf: [
                {
                  claim_type: "specific_rewards",
                },
              ],
            },
          },
          {
            name: "rule_config.threshold_value",
            label: "Reward Count",
            description: "Number of rewards claimed to match",
            type: "input",
            mode: "number",
            // length: {
            //   minimum: 1,
            //   maximum: 1000,
            // },
            required: true,
            position: { row: 2, col: 2, span: 1 },
            conditions: {
              allOf: [
                {
                  claim_type: "total_count",
                },
              ],
            },
          },
          {
            name: "rule_config.reward_ids",
            label: "Rewards",
            description: "Select specific rewards to match",
            type: "multi_select",
            options: [],
            required: true,
            position: { row: 3, col: 1, span: 2 },
            conditions: {
              allOf: [
                {
                  claim_type: "specific_rewards",
                },
              ],
            },
          },
          {
            name: "rule_config.match_type",
            label: "Match Type",
            description: "How to match the selected rewards",
            type: "select",
            options: [
              { label: "Any Of", value: "any_of" },
              { label: "All Of", value: "all_of" },
              { label: "None Of", value: "none_of" },
            ],
            required: true,
            position: { row: 2, col: 2, span: 1 },
            conditions: {
              allOf: [
                {
                  claim_type: "specific_rewards",
                },
              ],
            },
          },
        ],
      },
    ] as FormGroup[],
  },
};
