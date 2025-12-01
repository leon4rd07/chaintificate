import { prisma } from "@/lib/prisma";
import { Category, Type } from '../app/generated/prisma/client';

async function main() {
    console.log('Start seeding ...')

    const locations = ['New York', 'Remote', 'San Francisco', 'London', 'Berlin', 'Jakarta', 'Singapore', 'Tokyo']
    const categories = [
        Category.Technology,
        Category.Business,
        Category.Health,
        Category.Education,
        Category.Entertainment
    ]
    const types = [Type.FullTime, Type.PartTime]

    const jobTitles = [
        "Software Engineer", "Product Manager", "Data Analyst", "UX Designer", "Marketing Specialist",
        "Sales Representative", "HR Manager", "Financial Analyst", "Operations Manager", "Customer Support",
        "DevOps Engineer", "QA Engineer", "Content Writer", "Graphic Designer", "Legal Counsel",
        "Research Scientist", "Teacher", "Nurse", "Doctor", "Pharmacist"
    ]

    for (let i = 0; i < 20; i++) {
        const category = categories[i % categories.length]
        const type = types[i % types.length]
        const location = locations[i % locations.length]
        const title = jobTitles[i % jobTitles.length]

        await prisma.jobVacancy.create({
            data: {
                companyName: `Company ${String.fromCharCode(65 + i)}`, // Company A, B, C...
                position: title,
                category: category,
                jobDescription: [
                    `We are looking for a talented ${title} to join our team.`,
                    `You will be responsible for key projects in the ${category} sector.`,
                    "Collaborate with cross-functional teams."
                ],
                jobRequirements: [
                    "Bachelor's degree in related field.",
                    "3+ years of experience.",
                    "Strong communication skills."
                ],
                location: location,
                type: type,
                salary: `$${50000 + (i * 2000)} - $${70000 + (i * 2000)}`,
            }
        })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })