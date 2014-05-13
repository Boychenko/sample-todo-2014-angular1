namespace Todo.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ItemImprovement : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Items", "Title", c => c.String(nullable: false, maxLength: 250));
            AddColumn("dbo.Items", "Description", c => c.String());
            AlterColumn("dbo.Items", "Priority", c => c.Int(nullable: false));
            AlterColumn("dbo.Items", "DueDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Items", "DueDate", c => c.DateTimeOffset(precision: 7));
            AlterColumn("dbo.Items", "Priority", c => c.Int());
            DropColumn("dbo.Items", "Description");
            DropColumn("dbo.Items", "Title");
        }
    }
}
