---
date: 2023-08-14T00:00:00.000Z
title: Connect .NET app to Postgres on Mac
description: "Get your .NET web app to connect to a local Postgres database running on a Mac"
heroImages:
  - alt: Screenshot of Postico showing a database
    image: /assets/postgres.jpg
thumbnail:
  - alt: Screenshot of Postico showing a database
    image: /assets/postgres.jpg
xrMa: false
hide: false
archive: false
category: words
---

On my Mac I have a Postgres database I would like to connect to a .NET web app. I found the article [Connect PostgreSQL to your .NET 7.0 project](https://zetbit.tech/categories/asp-dot-net-core/42/setup-a-postgresql-connection-with-entity-framework-in-dot-net-7) very useful in achieving this. I mostly used their process but opted for user secrets instead of `appsettings.json` as I didn’t want to commit the connection string to source control. Also I had to use the `dotnet` command line tool as the Package Manager on a Mac doesn’t appear to allow input.

.NET makes use of [Entity Framework](https://learn.microsoft.com/en-us/ef/) (EF), an object-relational mapper which enables developers to work with a database using .NET objects. For example, if you create a class in your .NET app, EF can map that to a table in your database. Keeping your backend code in sync with your database keeps the data types in sync, making working between the two much more predictable.

## Prerequisites

- Postgres running locally ([how to install on Mac](https://wiki.postgresql.org/wiki/Homebrew) and connect to it via terminal command `psql postgres`)
- .NET command line tools
- .NET app running locally

1. Add the [EF CLI tools](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) via `dotnet tool install --global dotnet-ef`
2. Add the following Nuget dependencies to your .NET project
   - `Npgsql.EntityFrameworkCore.PostgreSQL`
   - `Microsoft.EntityFrameworkCore`
   - `Microsoft.EntityFrameworkCore.Tools`
3. Add a [user secret](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=linux) for `ConnectionStrings.WebApiDatabase`, e.g. your secrets.json will look something like

```csharp
{
    "ConnectionStrings": {
        "WebApiDatabase": "Host=localhost; Database=YOUR_DATABASE_NAME; Username=YOUR_USERNAME; Password=YOUR_PASSWORD"
    }
}
```

1. In your project, add a new folder `Data` and create file `AppDbContext.cs` and replace with these contents (source: [AlexKlugZetbit](https://github.com/AlexKlugZetbit)):

`gist:AlexKlugZetbit/d836dfc9a8d9537f501a303e4f33596f`

2. The line `public DbSet<Employee> Employees { get; set; }` will include an undefined `Employee` type. Properties of type DbSet will be mapped to tables in your database when a migration is run. So assuming we want a table of Employees we need to define the Employee type, which will represent a row in that table. You can define Employee by right clicking it and selecting Refactor > Create class in new file. Then define the properties, for example (source: [AlexKlugZetbit](https://github.com/AlexKlugZetbit))

`gist:AlexKlugZetbit/1d6df01ce175c59e9ded7d9fa4369c44`

3. Now create the initial migration `dotnet ef migrations add InitialCreate`
4. And run the migration `dotnet ef database update`
5. If you check your local Postgres database (e.g. with [Postico](https://eggerapps.at/postico2/)), you should see a new table called `Employees` with columns matching the properties you set on the `Employee` object.
6. You can add additional tables by adding more `DbSet` properties on your `AppDbContext` class and re-running the two migration CLI commands.
